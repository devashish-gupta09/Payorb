import { CMS_URL } from "../config/urls";
import firebase from "./firebase";

export const buildImageUrl = (urlSegment) => {
  return `${CMS_URL}${urlSegment}`;
};

export const IMAGE_TYPE = {
  EVENT_COVER: "EVENT_COVER",
  EVENT_IMAGE: "EVENT_IMAGE",
};

export const IMAGE_DIR = {
  COVER_IMAGE_FIRESTORE_DIR: "/event-cover",
  EVENT_IMAGE_FIRESTORE_DIR: "/event",
};

export class ImageUtils {
  static async handleImageUpload(image, fileName) {
    const type = ImageUtils.getImageExtFromDataUrl(image);

    const ref = firebase.storage().ref();
    const childRef = ref.child(`${fileName}.${type.split("/")[1]}`);

    try {
      await childRef.putString(image, "data_url", {
        cacheControl: "max-age=9999999999",
        customMetadata: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      return await childRef.getDownloadURL();
    } catch (err) {
      // Don't do anything if an image upload is unsuccessful
      console.log("Error", err);
      throw err;
    }
  }

  static getImageExtFromDataUrl(image) {
    return image.substring(image.indexOf(":") + 1, image.indexOf(";"));
  }

  static buildImageFileName(type, uid, link, index) {
    switch (type) {
      case IMAGE_TYPE.EVENT_COVER:
        return `${IMAGE_DIR.COVER_IMAGE_FIRESTORE_DIR}/${uid}/${link}`;
      case IMAGE_TYPE.EVENT_IMAGE:
        return `${IMAGE_DIR.EVENT_IMAGE_FIRESTORE_DIR}/${uid}/${link}/${index}}}`;
      default:
        return "";
    }
  }
}
