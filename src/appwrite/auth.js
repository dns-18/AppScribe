import conf, { getAppwriteConfigurationError } from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

function readableAuthError(error) {
    if (error?.message === 'Failed to fetch' || error?.name === 'TypeError') {
        return new Error('Cannot reach Appwrite. Check your internet connection and confirm this website is allowed in Appwrite > Overview > Platforms.');
    }

    return error instanceof Error ? error : new Error('Authentication failed. Please try again.');
}

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    ensureConfigured() {
        const configurationError = getAppwriteConfigurationError();
        if (configurationError) throw new Error(configurationError);
    }

    async createAccount({ email, password, name }) {
        try {
            this.ensureConfigured();
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            return userAccount ? this.login({ email, password }) : userAccount;
        } catch (error) {
            throw readableAuthError(error);
        }
    }

    async login({ email, password }) {
        try {
            this.ensureConfigured();
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw readableAuthError(error);
        }
    }

    async getCurrentUser() {
        try {
            this.ensureConfigured();
            return await this.account.get();
        } catch (error) {
            // A 401 only means that no user is signed in yet.
            if (error?.code !== 401) {
                console.error("Appwrite service :: getCurrentUser :: error", readableAuthError(error));
            }
            return null;
        }
    }

    async logout() {
        try {
            this.ensureConfigured();
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error", readableAuthError(error));
        }
    }
}

const authService = new AuthService();

export default authService;
