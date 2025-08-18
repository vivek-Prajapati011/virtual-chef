import React from "react";
const Form = () => {
    const ingridents = ["potato","chicken", "garlic"]
    const submitHandler = (e) => {
        e.preventDefault()

    }
    return (
        <main>
        <form className="ingrident-form " onClick={submitHandler}>
            <input
              type="text"
            />
            <button >Add ingrident</button>
        </form>
    </main>
    )

}
export default Form