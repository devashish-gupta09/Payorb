import axios from "axios"
import { CMS_URL } from "../constants/api"
import { buildImageUrl } from "../utils/images"

export const getHomeContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/home`)
        const urls = res.data.carousel.map(image => buildImageUrl(image.formats.large.url))

        return {
            titleSection1: res.data.titleSection1,
            titleSection2: res.data.titleSection2,
            titleSection3: res.data.titleSection3,
            description: res.data.description,
            urls
        }

    } catch (err) {
        console.error(err.message)
    }
}

export const getFeaturesContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/feature-section`)

        res.data.features.map((feature, index) => {
            res.data.features[index].image = buildImageUrl(feature.image.url)
        }
        )

        return {
            title: res.data.title,
            sectionLogo: buildImageUrl(res.data.sectionLogo.url),
            sectionTitle: res.data.sectionTitle,
            features: res.data.features
        }

    } catch (err) {
        console.error(err.message)
    }
}

export const getEventRegistrationContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/event-registration`)

        return {
            sectionLogo: buildImageUrl(res.data.sectionLogo.url),
            sectionTitle: res.data.sectionTitle,
            title: res.data.title,
            description: res.data.description,
            image: buildImageUrl(res.data.image.url)
        }

    } catch (err) {
        console.error(err.message)
    }
}

export const getUserRegistrationContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/user-registration`)

        return {
            sectionLogo: buildImageUrl(res.data.sectionLogo.url),
            sectionTitle: res.data.sectionTitle,
            title: res.data.title,
            description: res.data.description,
            image: buildImageUrl(res.data.image.url)
        }

    } catch (err) {
        console.error(err.message)
    }
}

export const getClientReviewContent = async () => {
    try {
        const res = await axios.get(`${CMS_URL}/client-review`)

        res.data.clients.map((client, index) => {
            res.data.clients[index].image = buildImageUrl(client.image.formats.thumbnail.url)
        }
        )

        return {
            title: res.data.title,
            sectionLogo: buildImageUrl(res.data.sectionLogo.url),
            sectionTitle: res.data.sectionTitle,
            clients: res.data.clients
        }

    } catch (err) {
        console.error(err.message)
    }
}