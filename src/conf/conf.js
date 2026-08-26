const conf = {
    appwriteUrl: import.meta.env.VITE_APPWRITE_URL?.trim(),
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID?.trim(),
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID?.trim(),
    appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID?.trim(),
    appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID?.trim(),
    tinymceApiKey: import.meta.env.VITE_TINYMCE_API_KEY?.trim(),
}

const requiredAppwriteSettings = [
    ['VITE_APPWRITE_URL', conf.appwriteUrl],
    ['VITE_APPWRITE_PROJECT_ID', conf.appwriteProjectId],
]

export function getAppwriteConfigurationError() {
    const missing = requiredAppwriteSettings
        .filter(([, value]) => !value || value === 'undefined')
        .map(([name]) => name)

    if (missing.length) {
        return `Missing Appwrite configuration: ${missing.join(', ')}. Add it to your Vercel environment variables and redeploy.`
    }

    try {
        const endpoint = new URL(conf.appwriteUrl)
        if (endpoint.protocol !== 'https:') return 'VITE_APPWRITE_URL must use HTTPS in production.'
    } catch {
        return 'VITE_APPWRITE_URL is not a valid URL.'
    }

    return null
}

export default conf
