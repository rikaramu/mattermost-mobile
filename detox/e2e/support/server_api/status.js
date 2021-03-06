// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import client from './client';
import {getResponseFromError} from './common';

// ****************************************************************
// Status
// See https://api.mattermost.com/#tag/status
//
// Exported API function should have the following:
// - documented using JSDoc
// - meaningful description
// - match the referenced API endpoints
// - parameter/s defined by `@param`
// - return value defined by `@return`
// ****************************************************************

/**
 * Get user status.
 * See https://api.mattermost.com/#tag/status/paths/~1users~1{user_id}~1status/get
 * @param {string} userId - the user ID
 * @return {Object} returns {userStatus} on success or {error, status} on error
 */
export const apiGetUserStatus = async (userId) => {
    try {
        const response = await client.get(`/api/v4/users/${userId}/status`);

        return {userStatus: response.data};
    } catch (err) {
        return getResponseFromError(err);
    }
};

/**
 * Update user status.
 * See https://api.mattermost.com/#tag/status/paths/~1users~1{user_id}~1status/put
 * @param {string} userId - the user ID
 * @param {string} status - the user status, can be online, away, offline and dnd
 * @return {Object} returns {userStatus} on success or {error, status} on error
 */
export const apiUpdateUserStatus = async (userId, status = 'online') => {
    try {
        const response = await client.put(
            `/api/v4/users/${userId}/status`,
            {user_id: userId, status},
        );

        return {userStatus: response.data};
    } catch (err) {
        return getResponseFromError(err);
    }
};

export const Status = {
    apiGetUserStatus,
    apiUpdateUserStatus,
};

export default Status;
