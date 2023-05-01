import { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
    const userID = useGetUserId();
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"]);
    const [ recipe, setRecipe ] = useState({
        name: "",
        ingredients: [],
        instruction: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRecipe({...recipe, [name]: value})
    };

    const handleIngredientChange = (e, idx) => {
        const { value } = e.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients: ingredients});
    };

    const addIngridient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe,  {
                 headers: { authorization: cookies.access_token 
            }});
            navigate("/");
        } catch(err) {
            console.error(err);
        };
    };

    return (
        <div className="create-recipe">
            <h2>  Create recipe  </h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input 
                    name="name"
                    type="text"  
                    id="name" 
                    onChange={handleChange}/>
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, idx) => (
                    <input 
                        name="ingredients"
                        value={ingredient}
                        key={idx} 
                        type="text"
                        onChange={(e) => handleIngredientChange(e, idx)}> 
                    </input>
                ))}
                <button type="button" onClick={addIngridient}> Add ingredient </button>
                <label htmlFor="instruction">Instruction</label>
                <textarea id="instruction"  name="instruction" onChange={handleChange} />
                <label htmlFor="imageUrl">Image URL</label>
                <input onChange={handleChange} type="text" name="imageUrl" id="imageUrl" />
                <label htmlFor="cookingTime">Cooking time (minutes)</label>
                <input onChange={handleChange} type="number" name="cookingTime" id="cookingTime" />
                <button type="submit"> Create recipe </button>
            </form>
        </div>
    )
};