import { CMS_URL } from "../constants/api"

export const buildImageUrl = (urlSegment) => {
    return `${CMS_URL}${urlSegment}`
}