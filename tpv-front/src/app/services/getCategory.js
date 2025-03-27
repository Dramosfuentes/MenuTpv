const NEXT_PUBLIC_STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN
const NEXT_PUBLIC_STRAPI_HOST = process.env.NEXT_PUBLIC_STRAPI_HOST

export async function getCategories() {
    const response = await fetch(`${NEXT_PUBLIC_STRAPI_HOST}/api/categories?populate=sub_items`, {
        headers: {
            Authorization: `Bearer ${NEXT_PUBLIC_STRAPI_TOKEN}`
        }
    })
    const data = await response.json()
    return data
}
