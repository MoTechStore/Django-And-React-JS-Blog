import React, {useState,useEffect} from 'react'
import APISerive from './APIService'
import {useCookies} from 'react-cookie';


function Form(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [token] = useCookies(['mytoken'])

    useEffect(()=>{
        setTitle(props.article.title)
        setDescription(props.article.description)

    }, [props.article])


    const updateArticle = ()=>{
        APISerive.UpdateArticle(props.article.id, {title,description},token['mytoken'])
        .then(resp => props.updatedInformation(resp))
        setTitle('')
        setDescription('')
    }


    const insertArticle = ()=>{
        APISerive.InsertArticle({title,description},token['mytoken'])
        .then(resp => props.insertedInformation(resp))
        setTitle('')
        setDescription('')
    }

    return (
        <div>
            {props.article ? (<div>
                <div className="col-md-7">
            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                <input type="text" value={title} className="form-control" placeholder="Enter Post Title" onChange ={e=> setTitle(e.target.value)}/>
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                <textarea type="text" value={description} className="form-control" placeholder="Enter Post Description" rows="3" onChange ={e=> setDescription(e.target.value)}/>
                </div>
            </div>

            <br />
            {props.article.id ? 
            <button onClick ={updateArticle} className="btn btn-success">Update</button>
            :
            <button onClick ={insertArticle} className="btn btn-primary">Post</button>
            }
            </div>


            </div>) : null}

        </div>
    )
}

export default Form
