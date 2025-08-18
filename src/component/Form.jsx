import React, { useState } from "react";
const Form = () => {
  const [ingridents, setIngridents] = useState(false);
  const ingridentItems = ingridents.map((ingrident) => {
    return <li key={ingrident}>{ingrident}</li>;
  });
  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newIngrident = formData.get("ingrident")
    
    if (newIngrident.trim() !== "") {
      
      setIngridents([...ingridents, newIngrident]);
      e.currentTarget.reset(); 
    }
  };
  return (
    <main>
      <form className="ingrident-form " onSubmit={submitHandler}>
        <input type="text"  name="ingrident"/>
        <button>Add ingrident</button>
      </form>
    {ingridents &&  <section>
        <h2>Ingrident on hand : </h2>
        <ul className="Ingrident-list">{ingridents}</ul>
        <div className="get-recipe-container">
          <div>
            <h2>Ready fir recipe?</h2>
            <p>Generate recipe form list of your ingrident</p>
          </div>
          <button> Get recipe</button>

        </div>
      </section>}
    </main>
  );
};
export default Form;
