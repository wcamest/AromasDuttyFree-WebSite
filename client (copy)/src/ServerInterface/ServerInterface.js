import axios from "axios";

const ServerInterface = {
    ProductFilter: {
        async All() {
            try {
                const response = await axios.get("/api/product/filter/all");
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async Add(data) {
            try {
                const response = await axios.post("/api/product/filter/add", data);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async Rename(data) {
            try {
                const response = await axios.put("/api/product/filter/rename", data);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async Delete(id) {
            try {
                const response = await axios.delete(`/api/product/filter/${id}/delete`);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    },
    Product: {
        async All(offset){
            try {
                const response = await axios.get(`/api/product/all?offset=${offset}`);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async CreateOrUpdate(formData){
            try {
                const response = await axios.post("/api/product/create_or_update", formData);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async Delete(data){
            try {
                const response = await axios.put("/api/product/delete", data);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default ServerInterface;