const {argsToArgsConfig} = require("graphql/type/definition");
const mongoose = require('mongoose');

module.exports = {
    // General queries
    uploads: (_, __) => {
    },

    me: async (_, __, {models, user}) => {

        return await models.User.findById(user.id);

    },
    users: async (_, filter, {models, user}) => {

        const userData = await models.User.findById(user.id);
        const idsToExclude = userData.shortlistedCandidates.concat(userData.rejectedCandidates);

        const shouldApplyFilters = Object.keys(filter).length !== 0;

        if (!shouldApplyFilters) {
            return await models.User.find({_id: {$nin: idsToExclude}});
        }

        const shouldApplyExperienceFilter = filter.experience;
        const shouldApplyCurrentRolesFilter = filter.currentRoles;
        const shouldApplyOpenToRolesFilter = filter.openToRoles;
        const shouldApplyJobTypesFilter = filter.jobTypes;

        var users = models.User;

        if (shouldApplyExperienceFilter) {
            users = users.find(
                {experience: {$in: filter.experience, _id: {$nin: idsToExclude}}}
            )
        }

        if (shouldApplyCurrentRolesFilter) {
            users = users.find(
                {currentRole: {$in: filter.currentRoles, _id: {$nin: idsToExclude}}}
            )
        }

        if (shouldApplyOpenToRolesFilter) {
            users = users.find(
                {openToRoles: {$elemMatch: {$in: filter.openToRoles}}}
            )
        }

        if (shouldApplyJobTypesFilter) {
            users = users.find(
                {jobType: {$elemMatch: {$in: filter.jobTypes}}, _id: {$nin: idsToExclude}}
            )
        }

        return await users;
    },
    companies: async (_, __, {models}) => {
        return await models.Company.find();
    },

    jobPostings: async (_, filter, {models, user}) => {
        const shouldApplyFilters = Object.keys(filter).length !== 0;
        const userData = await models.User.findById(user.id);
        const idsToExclude = userData.appliedTo.concat(userData.rejected);

        if (!shouldApplyFilters) {
            const openToRoles = userData.openToRoles;
            const interestedInRoles = await models.JobPosting.find({_id: {$nin: idsToExclude}, roles: {$elemMatch: {$in: openToRoles}}});
            const notInterestedInRoles = await models.JobPosting.find({_id: {$nin: idsToExclude}, roles: {$not:{$elemMatch: {$in: openToRoles}}}});
            return interestedInRoles.concat(notInterestedInRoles);

        }

        // console.log("userData", userData);
        const shouldApplyCompanyNameFilter = filter.companyName != null;
        const shouldApplyCompanyTypeFilter = filter.companyType != null;
        const shouldApplyRolesFilter = filter.roles;
        const shouldApplyJobTypesFilter = filter.jobTypes;

        var jobPostings = models.JobPosting;
        var company;

        if (shouldApplyCompanyNameFilter) {
            company = await models.Company.findOne({
                name: filter.companyName,

            });
            jobPostings = jobPostings.find(
                {
                    company,
                    _id: {$nin: idsToExclude}
                }
            )
        }

        if (shouldApplyCompanyTypeFilter) {
            company = await models.Company.find({
                type: filter.companyType,

            });
            jobPostings = jobPostings.find(
                {
                    company,

                    _id: {$nin: idsToExclude}
                }
            )
        }

        if (shouldApplyRolesFilter) {
            jobPostings = jobPostings.find(

                {roles: {$elemMatch: {$in: filter.roles}},
                _id: {$nin: idsToExclude}}
            )
        }

        if (shouldApplyJobTypesFilter) {
            jobPostings = jobPostings.find(
                {jobTypes: {$in: filter.jobTypes},
                _id: {$nin: idsToExclude}
                }
            )
        }

        return await jobPostings;

    },

    jobPosting: async (_, {id}, {models, user}) => {
        return await models.JobPosting.findById(id);
    }


};