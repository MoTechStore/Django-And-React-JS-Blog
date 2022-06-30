import './App.css';
import ArticleList from './components/ArticleList';
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/NavBar';
import Form from './components/Form';
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'


function App() {
  const [articles, setArticles] = useState([])
  const [editArticle, setEditArticle] = useState('')
  const [token, setToken, removeToken] = useCookies(['mytoken'])
  let navigate = useNavigate()


  useEffect(() =>{
    fetch('http://localhost:8000/api/articles/', {
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'a2a76bcaca32becedbd9fc8542dc293f9c98b92b'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))

  }, [])

  const editBtn = (article) =>{
    setEditArticle(article)
  }

  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if(myarticle.id === article.id){
        return article
      }else{
        return myarticle
      }
    })
    setArticles(new_article)
  }

  const articleForm = () =>{
    setEditArticle({title:'', description:''})
  }

  const insertedInformation = (article) => {
   const new_articles = [...articles,article]
   setArticles(new_articles)
  }

  const deleteBtn = (article) =>{
    const new_article = articles.filter(myarticle => {
      if(myarticle.id === article.id){
        return false
      }
      
      return true
    })
    setArticles(new_article)
  }


  useEffect(()=> {
    var user_token = token['mytoken']
    console.log('User token is',user_token)
    if(String(user_token) === 'undefined'){
        navigate('/')
    }else{
      navigate('/articles')
    }
}, [token])


const logoutBtn = () => {
  removeToken(['mytoken'])

}
 


  return (
    <div className="App">

   <NavBar />
   <br />

   <div className="row">
     <div className="col">
       <button className="btn btn-primary" onClick={articleForm}>Create Post</button>

     </div>

   </div>



    <ArticleList articles={articles} editBtn ={editBtn}  deleteBtn ={deleteBtn}/>
    <Form  article = {editArticle} updatedInformation= {updatedInformation} insertedInformation= {insertedInformation}/>
  
    </div>
  );
}

export default App;
