export async function get(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (err) {
        throw new Error(err);
    }
}

export async function post(url: string, body: {}): Promise<any> {
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
            });
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}

export async function patch(url: string, body: {}): Promise<any> {
    try {
        const response = await fetch(url,
            {
                method: 'PATCH',
                body: JSON.stringify(body),
                headers: new Headers({
                  'Content-Type': 'application/json'
                })
            });
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}