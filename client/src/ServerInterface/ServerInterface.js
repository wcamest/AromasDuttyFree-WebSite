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
        async Create(formData){
            try {
                const response = await axios.post("/api/product/add", formData);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default ServerInterface;