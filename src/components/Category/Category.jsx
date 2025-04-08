import React, { useState, useEffect } from 'react'
import style from "./Category.module.css"
function Category() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([]);

    const user = sessionStorage.getItem("login");

    async function translateText ({text, targetLanguage}) {
      const response = await fetch(`https://lingva.ml/api/v1/en/${targetLanguage}/${encodeURIComponent(text)}`);
      const data = await response.json();
      return data.translation;
    }

    useEffect(() => {
        getCategories();

        if (categories.length === 0) {
          setErrorMessage('Nenhuma categoria cadastrada');
        }
      }, [])

    async function getCategories() {
        try {
          const response = await fetch(`https://expense-control-backend-8rmh.onrender.com/users/${parseInt(user)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            const details = errorData.detail;
            const errorMessages = Array.isArray(details)
              ? details.map(item => item.msg).join(', ')
              : details;
            const translatedText = await translateText({ text: errorMessages, targetLanguage: 'pt' });
            throw new Error(translatedText);
          }
    
          const list = await response.json();
          
          // Verifica se list.categories existe para evitar erros
          const newCategories = list.categories?.map(category => ({
            id: category.id,
            name: category.ds_title,
            description: category.ds_description
          })) || [];
    
          setCategories(newCategories);
        } catch (error) {
          console.error('Erro:', error);
          setErrorMessage(error.message);
        }
      }

    return (
        <div className={style.background}>
            <div className={style.container}>
                <h1>Categorias</h1>
                <div className={style.formContainer}>
                    <div className={style.inputContainer}>
                        <input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={style.formInput}
                        />
                        <input
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={style.formInput}
                        />
                    </div>
                    <div className={style.formButtons}>
                        <button onClick={() => {console.log("a")}} className={style.btnIncome}>Salvar</button>
                    </div>
                </div>
            </div>

            <div className={style.container}>
                <div className={style.listContainer}>
                    <div className={style.description}>
                        <span className={style.text}>Título</span>
                        <span className={style.text}>Descrição</span>
                    </div>
                    {categories && categories.length > 0 ? (
                        categories.map((t) => (
                            <div key={t.id} className={style.categoryItem}>
                                <span className={style.categoryName}>{t.name}</span>
                                <span className={style.categoryDescription}>{t.description}</span>
                            </div>
                        ))
                    ) : (
                        <p className={style.emptyMessage}>{errorMessage}</p>
                    )}
                </div>
            </div>
      </div>
    )
}

export default Category