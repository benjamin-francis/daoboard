const {gql} = require('apollo-server-express');

// Add messages
// Figure out files (and put in updateProfile function)

module.exports = gql`
    scalar Upload
    scalar Date
    scalar Email

    type User {

        """
        Account info
        """

        id: ID!
        email: Email!
        password: String!
        publicKey: String
        accountType: [AccountType]

        """
        Match info
        """

        matchedTo: [User]
        matchedFrom: [User]
        matches: [User]
        rejectedJobs: [JobPosting]

        """
        Recruiter info
        """

        company: Company
        jobPostings: [JobPosting]
        rejectedJobSeekers: [User]

        """
        About
        """

        firstName: String
        lastName: String
        pfp: String
        currentRole: Role
        openToRoles: [Role]
        bio: String
        role: String
        """
        Social media
        """

        website: String
        linkedIn: String
        github: String
        twitter: String

        """
        Experience
        """

        jobExperience: [JobExperience]

        """
        Education
        """

        education: [Education]

        """
        Status
        """

        status: Status

        """
        Job type
        """

        hereTo: [JobType]

        """
        What are you looking for in web3
        """

        lookingForWebThree: String

        appliedTo: [JobPosting]
        uploads: [String]

    }

    type Education {
        id: ID!
        school: String!
        graduation: Date!
        degreeType: DegreeType!
        user: User!
    }

    type Company {
        id: ID!
        name: String!
        logo: String
        website: String
        linkedIn: String
        github: String
        twitter: String
        markets: [Market]
        elevatorPitch: String
        recruiters: [User!]
        jobsPostings: [JobPosting]
    }

    type JobPosting {
        id: ID!
        company: Company
        title: String
        about: String
        roles: [Role!]!
        jobType: JobType!
        recruiter: User!
        applied: [User!]!

    }

    type SignInResponse {
        token: String!
        user: User!
    }

    type Query {
        uploads: [File]
        users(
            currentRoles: [Role]
            openToRoles: [Role]
            jobTypes: [JobType]
        ): [User]!
        companies: [Company]!
        jobPostings(
            markets: [Market]
            roles: [Role]
            jobTypes: [JobType]
        ): [JobPosting]!
        jobPosting(id: ID!): JobPosting!
        company(id: ID!): Company!

        """
        User queries
        """
        me: User!

    }

    type Mutation {
        singleUpload(file: Upload!): File!
        signUp(email: Email!, password: String!, firstName: String!, lastName:String!, accountType: AccountType!): String!
        signIn(email: Email!, password: String!): SignInResponse!

        matchToJobPosting(jobPostingId: ID!): JobPosting!
        applyToJobPosting(jobPostingId: ID!): JobPosting!
        rejectJobPosting(jobPostingId: ID!): JobPosting!

        matchToJobSeeker(jobSeekerId: ID!): User!
        rejectJobSeeker(jobSeekerId: ID!): User!
        uploadResume(file: Upload!): File!

        updateProfile(
            firstName: String
            lastName: String
            accountType: [AccountType]
            currentRole: Role
            openToRoles: [Role]
            bio: String
            website: String
            linkedIn: String
            github: String
            twitter: String
            status: Status
            hereTo: [JobType]
            lookingForWebThree: String
        ): User!

        updatePFP(pfp: Upload!): User!

        createJobExperience(
            company: String!
            title: String!
            startDate: Date!
            endDate: Date!
        ): JobExperience!

        updateJobExperience(
            id: ID!
            company: String
            title: String
            startDate: Date
            endDate: Date
        ): JobExperience!

        createEducation(
            school: String!
            graduation: Date
            degreeType: DegreeType
        ): Education!

        updateEducation(
            id: ID!
            school: String
            graduation: Date
            degreeType: DegreeType
        ): Education!

        createCompany(
            name: String!
            website: String
            linkedIn: String
            github: String
            twitter: String
            markets: [Market]!
            elevatorPitch: String!
        ): Company!

        updateCompanyLogo(id: ID!, logo: Upload!): Company
        updateCompany(
            id: ID!
            name: String
            website: String
            linkedIn: String
            github: String
            twitter: String
            markets: [Market]
            elevatorPitch: String
        ): Company!

        createJobPosting(
            title: String!
            about: String!
            roles: [Role!]!
            jobType: JobType!
        ): JobPosting!
        updateJobPosting(
            id: ID!
            title: String
            about: String
            roles: [Role]
            jobType: JobType
        ): JobPosting!

        applyToJob(id: ID!): JobPosting!
        updateResume(id: ID!, resume: Upload!): User!

    }


    type File {
        uri: String!
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type JobExperience {
        id: ID!
        company: String!
        title: String!
        startDate: Date
        endDate: Date

    }


    enum AccountType {
        JobSeeker
        Recruiter
    }

    enum Role {
        Engineering
        Product
        Design
        Investing
        Operations
        Sales and Marketing
    }

    enum DegreeType {
        HighSchool
        Associate
        Bachelor
        Master
        PhD
    }

    enum Market {
        B2B_Software
        B2C_Software
        Hardware
        Data_ML_AI
        eCommerce
        Investing
        Networked Platforms
        Consumer Goods
    }

    enum jobExperienceType {
        Nontechnical
        Technical
    }

    enum Status {
        Open
        Closed
    }

    enum JobType {
        FullTime
        PartTime
        Intern
        Cofounder
        CXO
    }

`;
