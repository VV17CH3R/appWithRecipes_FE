import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserId();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch(err) {
                console.error(err);
            };
        };
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch(err) {
                console.error(err);
            };
        };
        fetchRecipes();
        fetchSavedRecipes();
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {
                recipeID, 
                userID},
                { headers: { authorization: cookies.access_token }}
            );
            setSavedRecipes(response.data.savedRecipes);
        } catch(err) {
            console.error(err);
        };
    };


    const isRecipeSaved = (id) => {
        return savedRecipes?.includes(id);
    };

    return (
        <div>
            <h1> Recipes </h1>
            <ul>
                {recipes?.map((recipe) => { return(
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            <button 
                                onClick={() => saveRecipe(recipe._id)} 
                                disabled={isRecipeSaved(recipe._id)}> 
                                {!isRecipeSaved(recipe._id) ? "Save on your profile" : "Saved on your profile"}
                            </button>
                        </div>
                        <div className="instruction">
                            <p>{recipe.instruction}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name}></img>
                        <p> Cooking time: {recipe.cookingTime} </p>
                    </li>
                )})}
            </ul>
        </div>
    )
};