export async function get(url: string): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'X-Auth': localStorage.getItem('olipie-token')
            })
        });
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Invalid Response');
        }
        const data = await response.json();
        return data.data || data.items;
    } catch (err) {
        throw new Error(err);
    }
}

export async function post(url: string, body: {}): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-Auth': localStorage.getItem('olipie-token')
            })
        });
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Invalid Response');
        }
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}

export async function update(url: string, body: {}): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: new Headers({
                'Content-Type': 'application/json',
                'X-Auth': localStorage.getItem('olipie-token')
            })
        });
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Invalid Response');
        }
        return await response.json();
    } catch (err) {
        throw new Error(err);
    }
}