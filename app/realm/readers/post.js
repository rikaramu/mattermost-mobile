import MMRealm from 'app/realm';

export const readPosts = async (channelId) => {
    const posts = {};

    try {
        const results = MMRealm.realm.objects('Post')
            .filtered(`channel_id = "${channelId}"`)
            .sorted([['create_at', true]]);

        for (let result of results) {
            const post = JSON.parse(JSON.stringify(result));

            posts[post.id] = {
                ...post,
                file_ids: parseFileIds(post.file_ids),
                metadata: parseMetadata(post.metadata),
            };
        }
    } catch(error) {
        console.log('READ', error)
    }

    return posts;
};

export const readPostIds = async (channelId) => {
    let postIds = [];

    try {
        const results = MMRealm.realm.objects('Post')
            .filtered(`channel_id = "${channelId}"`)
            .sorted([['create_at', true]]);

        // postIds = results.map((result) => result.id);
        for (let result of results) {
            postIds.push(result.id);
        }
    } catch(error) {
        console.log('READ', error)
    }

    return postIds;
}

const parseFileIds = (fileIds) => {
    if (fileIds && !Array.isArray(fileIds)) {
        return Object.values(fileIds);
    }

    return fileIds;
}

const parseMetadata = (metadata) => {
    const parsedMetadata = {};

    const files = parseMetadataFiles(metadata.files);
    if (files.length) {
        parsedMetadata.files = files;
    }

    const embeds = parseMetadataEmbeds(metadata.embeds);
    if (embeds.length) {
        parsedMetadata.embeds = embeds;
    }

    const emojis = parseMetadataEmojis(metadata.emojis);
    if (emojis.length) {
        parsedMetadata.emojis = emojis;
    }

    const images = parseMetadataImages(metadata.images);
    if (images.length) {
        parsedMetadata.images = images;
    }

    return parsedMetadata;
}

const parseMetadataEmbeds = (embeds) => {
    if (embeds && !Array.isArray(embeds)) {
        const parsedEmbeds = Object.values(embeds).map((embed) => {
            let parsedEmbed = {...embed};
            if (embed.data?.images && !Array.isArray(embed.data?.images)) {
                parsedEmbed = {
                    ...embed,
                    data: {
                        ...embed.data,
                        images: Object.values(embed.data.images),
                    },
                };
            }

            return parsedEmbed;
        });

        return parsedEmbeds;
    }

    return embeds;
}

const parseMetadataFiles = (files) => {
    if (files && !Array.isArray(files)) {
        return Object.values(files);
    }

    return files;
}

const parseMetadataEmojis = (emojis) => {
    if (emojis && !Array.isArray(emojis)) {
        return Object.values(emojis);
    }

    return emojis;
}

const parseMetadataImages = (images) => {
    if (images && Array.isArray(images)) {
        parsedImages = {};
        post.metadata.images.forEach((image) => {
            images[image.url] = images;
        });

        return parsedImages;
    }

    return images;
}