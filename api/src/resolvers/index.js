const { GraphQLUpload } = require('graphql-upload');
const { GraphQLDate } = require('graphql-scalars');
//const { GraphQLURL } = require('graphql-scalars');
const { GraphQLEmailAddress } = require('graphql-scalars');

const Query = require('./query');
const Mutation = require('./mutation');
const User = require('./user');
const JobPosting = require('./jobPosting');
const Company = require('./company');


module.exports = {
    Query,
    Mutation,
    User,
    JobPosting,
    Company,
    Upload: GraphQLUpload,
    Date: GraphQLDate,
    Email: GraphQLEmailAddress
};