import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";

export const SavedRecipes = () => {

    const [recipes, setRecipes] = useState([]);
    const userID = useGetUserId();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                setRecipes(response.data.savedRecipes);
            } catch(err) {
                console.error(err);
            };
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h1> Saved recipes </h1>
            <ul>
                {recipes?.map((recipe) => { return(
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
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