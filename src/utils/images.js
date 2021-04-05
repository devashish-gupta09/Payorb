import { CMS_URL } from "../config/urls";

export const buildImageUrl = (urlSegment) => {
  return `${CMS_URL}${urlSegment}`;
};
