import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [ingridents, setIngridents] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ingridentItems = ingridents.map((ingrident) => {
    return <li key={ingrident}>{ingrident}</li>;
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newIngrident = formData.get("ingrident");

    if (newIngrident.trim() !== "") {
      setIngridents([...ingridents, newIngrident]);
      e.currentTarget.reset();
    }
  };

  const generateFallbackRecipe = (ingredients) => {
    const recipes = [
      {
        name: "Delicious Stir Fry",
        ingredients: ingredients.join(", "),
        instructions: "1. Heat 2 tbsp oil in a large wok or pan over high heat\n2. Add minced garlic and ginger, stir for 30 seconds\n3. Add all your ingredients and stir fry for 5-7 minutes\n4. Season with soy sauce, salt, pepper, and a pinch of sugar\n5. Garnish with green onions and serve hot with steamed rice",
        cookingTime: "15 minutes",
        difficulty: "Easy"
      },
      {
        name: "Fresh Garden Salad",
        ingredients: ingredients.join(", "),
        instructions: "1. Wash and chop all ingredients into bite-sized pieces\n2. Mix in a large salad bowl\n3. Create dressing: 3 tbsp olive oil, 1 tbsp lemon juice, 1 tsp honey, salt & pepper\n4. Toss salad with dressing and serve immediately\n5. Optional: add nuts or cheese for extra flavor",
        cookingTime: "10 minutes",
        difficulty: "Very Easy"
      },
      {
        name: "Hearty Vegetable Soup",
        ingredients: ingredients.join(", "),
        instructions: "1. Heat 2 tbsp oil in a large pot over medium heat\n2. Sauté onions until translucent, add garlic\n3. Add all ingredients and 6 cups vegetable broth\n4. Bring to boil, then simmer for 20-25 minutes\n5. Season with herbs, salt, and pepper\n6. Serve hot with crusty bread",
        cookingTime: "35 minutes",
        difficulty: "Easy"
      },
      {
        name: "Quick Pasta Dish",
        ingredients: ingredients.join(", "),
        instructions: "1. Cook pasta according to package instructions\n2. Meanwhile, heat oil in a pan and sauté all ingredients\n3. Add cooked pasta to the pan with 1/2 cup pasta water\n4. Toss with olive oil, salt, pepper, and herbs\n5. Serve hot with grated cheese",
        cookingTime: "20 minutes",
        difficulty: "Easy"
      }
    ];
    
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    return ` ${randomRecipe.name}\n\n📋 Ingredients: ${randomRecipe.ingredients}\n\n👨‍🍳 Instructions:\n${randomRecipe.instructions}\n\n⏱️ Cooking Time: ${randomRecipe.cookingTime}\n⭐ Difficulty: ${randomRecipe.difficulty}\n\n💡 Tip: Feel free to adjust seasoning and cooking time based on your preferences!`;
  };

  const generateRecipe = async () => {
    setLoading(true);
    setError("");
    setRecipe("");

    try {
      const token = import.meta.env.VITE_HUGGING_FACE_TOKEN;
      
      if (!token || token === "your_hugging_face_token_here") {
        throw new Error("Please set your Hugging Face API token in the .env file");
      }

      const ingredientsText = ingridents.join(", ");
      const prompt = `Generate a delicious recipe using these ingredients: ${ingredientsText}. Please provide a detailed recipe with ingredients, instructions, and cooking time.`;

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/gpt2",
        {
          inputs: prompt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("API Response:", response.data); // Debug log

      if (response.data && response.data[0] && response.data[0].generated_text) {
        setRecipe(response.data[0].generated_text);
      } else if (response.data && response.data.generated_text) {
        setRecipe(response.data.generated_text);
      } else {
        console.log("Unexpected response format:", response.data);
        // Fallback to local recipe generation
        setRecipe(generateFallbackRecipe(ingridents));
      }
    } catch (err) {
      console.error("Error generating recipe:", err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
        
        if (err.response.status === 404) {
          setError("API endpoint not found. Using fallback recipe instead.");
          setRecipe(generateFallbackRecipe(ingridents));
        } else if (err.response.status === 401) {
          setError("Authentication failed. Please check your API token.");
        } else if (err.response.status === 429) {
          setError("Rate limit exceeded. Using fallback recipe instead.");
          setRecipe(generateFallbackRecipe(ingridents));
        } else {
          setError(`API Error: ${err.response.status} - ${err.response.data?.error || 'Unknown error'}. Using fallback recipe instead.`);
          setRecipe(generateFallbackRecipe(ingridents));
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Using fallback recipe instead.");
        setRecipe(generateFallbackRecipe(ingridents));
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(err.message || "Failed to generate recipe. Using fallback recipe instead.");
        setRecipe(generateFallbackRecipe(ingridents));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form className="ingrident-form " onSubmit={submitHandler}>
        <input type="text" name="ingrident" />
        <button>Add ingrident</button>
      </form>
      {ingridents.length > 0 && (
        <section>
          <h2>Ingrident on hand : </h2>
          <ul className="Ingrident-list">{ingridentItems}</ul>
          {ingridents.length > 3 && (
            <div className="get-recipe-container">
              <div>
                <h2>Ready for recipe?</h2>
                <p>Generate recipe from list of your ingrident</p>
              </div>
              <button 
                onClick={generateRecipe} 
                disabled={loading}
              >
                {loading ? "Generating..." : "Get recipe"}
              </button>
            </div>
          )}
        </section>
      )}

      {error && (
        <div className="error-message" style={{ color: 'red', margin: '20px 0', padding: '10px', border: '1px solid red', borderRadius: '5px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {recipe && (
        <div className="recipe-container" style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
          <h3>Generated Recipe:</h3>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {recipe}
          </div>
        </div>
      )}
    </main>
  );
};

export default Form;
