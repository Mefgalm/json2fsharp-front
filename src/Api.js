const baseUrl = process.env.REACT_APP_BASE_URL;

export async function generate(data, listGeneratorType, rootObject, typeGeneration) {
    const response = await fetch(baseUrl + "generate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Data: data,
            ListGeneratorType: { Case: listGeneratorType },
            RootObjectName: rootObject,
            TypeGeneration: { Case: typeGeneration }
        })
    });

    const json = await response.json();

    return {
        ok: json.case,
        data: json.fields[0]
    };
}

export default {
    generate
}