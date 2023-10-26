enum LoginProviderEnum {
    SELF,
    GOOGLE
}

function getALLENUMValues() {
    let providerName: string[] = [];
    for (const provider in LoginProviderEnum) {
        if (isNaN(Number(provider))) {
            providerName.push(provider);
        }
    }
    return providerName;
}

export {
    LoginProviderEnum,
    getALLENUMValues
}