import Stack from "../contentstack-sdk";
import { addEditableTags } from "@contentstack/utils";

const liveEdit = process.env.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "header",
    referenceFieldPath: ["navigation_menu.page_ref"],
  });

  liveEdit && addEditableTags(response[0][0], "header", true);
  return response[0][0];
};

export const getFooterRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "footer",
    referenceFieldPath: [],
    jsonRtePath: ["copyright"],
  });
  liveEdit && addEditableTags(response[0][0], "footer", true);
  return response[0][0];
};

export const getAllEntriesfor = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "reviewer",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "reviewer", true));
  return response[0];
};

export const getAllEntriesforTrips = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "trippage",
    jsonRtePath: undefined,
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "trippage", true));
  return response[0];
};

export const getAllEntries = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  // liveEdit &&
  // response[0].forEach((entry) => addEditableTags(entry, "page", true));
  return response[0];
};

export const getHomePageRes = async () => {
  const response = await getEntry({
    contentTypeUid: "page",
    // entryUrl: "/",
    // jsonRtePath: [
    //     "page_components.from_blog.featured_blogs.body",
    //     "page_components.section_with_buckets.buckets.description",
    //     "page_components.section_with_html_code.description",
    // ]
  });
  liveEdit && addEditableTags(response[0][0], "page", true);
  return response[0][0];
};

export const getPageRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "homepage",
    entryUrl,
    // referenceFieldPath: ["p_page_components.superheroes.p_character"],
    // jsonRtePath: ["page_components.hero-banner"],
  });
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getAllTeam = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "makers",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  return response[0];
};

export const getForPageRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    // referenceFieldPath: ["p_page_components.superheroes.p_character"],
    // jsonRtePath: ["page_components.hero-banner"],
  });
  liveEdit && addEditableTags(response[0], "page", true);
  return response[0];
};

export const getTripPageRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "trippage",
    entryUrl,
    // referenceFieldPath: ["p_page_components.superheroes.p_character"],
    // jsonRtePath: [
    //     "page_components.from_blog.featured_blogs.body",
    //     "page_components.section_with_buckets.buckets.description",
    //     "page_components.section_with_html_code.description",
    // ],
  });
  liveEdit && addEditableTags(response[0], "trippage", true);
  return response[0];
};

export const getTripDetailPageRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "tripdetailpage",
    entryUrl,
  });
  liveEdit && addEditableTags(response[0], "tripdetailpage", true);
  return response[0];
};

export const getAllReviewer = async () => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "reviewer",
    // jsonRtePath: ["body", "related_post.body"],
  });
  liveEdit && addEditableTags(response[0], "reviewer", true);
  return response[0];
};

export const getBlogListRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
  return response[0];
};

export const getBlogPostRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  });
  liveEdit && addEditableTags(response[0], "blog_post", true);
  return response[0];
};

export const getAllComposableHeros = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "super_hero_gallery_page",
    entryUrl,
    referenceFieldPath: ["p_character"],
    jsonRtePath: ["p_characters.description"],
  });

  liveEdit && addEditableTags(response, "super_hero_gallery_page", true);
  return response[0];
};

export const getComposableHeroHomeWorld = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "p_character",
    referenceFieldPath: ["home_world"],
    jsonRtePath: ["description"],
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "p_character", true));
  return response;
};

export const getComposableHeroSingleRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "p_character",
    entryUrl,
    referenceFieldPath: ["home_world"],
    jsonRtePath: ["description"],
  });

  liveEdit && addEditableTags(response[0], "p_character", true);
  return response[0];
};

export const getComposableHeroGallery = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: "super_hero_landing_page",
    entryUrl,
    referenceFieldPath: ["modular_blocks.super_heroes_gallery.heroes"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  });

  liveEdit && addEditableTags(response[0], "p_page", true);
  return response[0];
};

export const getSuperheroGalleryRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: "p_character",
    jsonRtePath: ["description"],
  });

  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, "p_character", true));
  return response;
};

export const metaData = (seo) => {
  const metaArr = [];
  for (const key in seo) {
    if (seo.enable_search_indexing) {
      metaArr.push(
        <meta
          name={
            key.includes("meta_")
              ? key.split("meta_")[1].toString()
              : key.toString()
          }
          content={seo[key].toString()}
          key={key}
        />
      );
    }
  }
  return metaArr;
};
