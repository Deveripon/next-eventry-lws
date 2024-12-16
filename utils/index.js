import { getPlaiceholder } from "plaiceholder";

export const remove_IdFromArrays = (array) => {
    const mappedArray = array.map((item) => {
        const { _id, ...rest } = item;
        return {
            id: _id.toString(),
            ...rest,
        };
    });
    return mappedArray;
};

export const remove_idFromObject = (object) => {
    const { _id, ...rest } = object;
    return {
        id: _id.toString(),
        ...rest,
    };
};

export async function generateBlurData(imageSrc) {
    const buffer = await fetch(imageSrc).then(async (res) =>
        Buffer.from(await res.arrayBuffer())
    );
    const data = await getPlaiceholder(buffer);
    return data;
}
