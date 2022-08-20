export class Request {
    constructor(url) {
        this.url = url;
    }
    async get() {
        const response = await fetch(this.url);
        const responseData = await response.json();

        return responseData; // İki objeyi barındıran api
    }
    async post(data) {
        const response = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const responseData = await response.json();

        return responseData;
    }
    // hali hazırda var olan bir değeri değiştireceğiz. ID değerine göre
    async put(id,data) {                                   
        const response = await fetch(this.url + "/" + id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const responseData = await response.json();

        return responseData;
    }
    // id üzerinden sileceğimiz için data göndermemize gerek yok.
    async delete(id) {                                   
        const response = await fetch(this.url + "/" + id, {
            method: "DELETE",
            // body: JSON.stringify(data),          // Herhangi bir veri göndermediğimiz için bu kısım olmayacak bu sefer.
            // headers: {
            //     "Content-type": "application/json; charset=UTF-8"
            // }
        });
        return "Veri Silindi";
    }
}