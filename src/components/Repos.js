import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useParams, Link, useNavigate} from 'react-router-dom';
import '../App.css';

const Repos = ()=>{
    let {pagenum} = useParams();
    const [repoData, setRepoData] = useState(undefined);
    const [page, setPage] = useState(parseInt(pagenum));
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setPage(parseInt(pagenum));
        setError(false);
        const fetchData = async () => {
            try{
                const { data } = await axios.get(`https://api.github.com/orgs/Netflix/repos?page=${page}`, {
                    headers: {
                        'Authorization': 'BEARER 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'
                    }
                  });
                console.log(data);
                setRepoData(data);
                setLoading(false);
                if(data.length < 1){
                    throw"error";
                }
            }catch(e){
                console.log(e);
                setError(true);
            }
            try{
                const { data } = await axios.get(`https://api.github.com/orgs/Netflix/repos?page=${page + 1}`, {
                    headers: {
                        'Authorization': 'BEARER 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'
                    }
                  });
                console.log(data);
                setDisable(false);
                if(data.length < 1){
                    setDisable(true);
                }
            }catch(e){
                setDisable(true);
            }
        }
        fetchData();
      }, [page, pagenum])

      if(error){
        return (
          <div>
            <h1>404 ERROR: NOT FOUND</h1>
          </div>
        )
      }
    
      if(loading){
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        )
      }

      if(repoData){
        let firstRun = repoData.sort(function(a, b) {
            return (a.stargazers_count - b.stargazers_count);
        });
    
        console.log(firstRun);
        return (
            <div>
            <br/>
            <br/>
            <nav aria-label="...">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                {page === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/repos/${page-1}`} onClick={()=>(setPage(page - 1))} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li className="page-item active" aria-current="page">
                <span className="page-link">{page}</span>
                </li>
                <li className="page-item">
                {disable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/repos/${page+1}`} onClick={()=>(setPage(page + 1))}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
            <br/>
            <br/>
            <div className="row row-cols-1 row-cols-md-2 g-4">
            {firstRun.map((repo) => {
              return (
                <div className='col-sm-6' key={repo.id}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{repo.name ? repo.name : 'No name Available'}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{!repo.language ? "Language: N/A" : `Language: ${repo.language}`}</li>
                                <li className="list-group-item">Description: {repo.description ? repo.description : "No Description"}</li>
                                <li className="list-group-item">Forks Count: {repo.forks_count ? repo.forks_count : "No forks count"}</li>
                                <li className="list-group-item">Stars Count: {repo.stargazers_count ? repo.stargazers_count : "No stars count"}</li>
                                <li className="list-group-item">Created At: {repo.created_at ? repo.created_at : "No Creation Date"}</li>
                            </ul>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-non" onClick={() => {navigate(`/commits/${repo.name}/1`)}}>Get Details</button>
                        </div>
                    </div>
                </div>
                )
            })}
            </div>
            <nav aria-label="...">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                {page === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/repos/${page-1}`} onClick={()=>{(setPage(page - 1)); window.scroll({top: 0});}} > <button className='page-link'>Prev</button></Link>}
                </li>
                <li className="page-item active" aria-current="page">
                <span className="page-link">{page}</span>
                </li>
                <li className="page-item">
                {disable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/repos/${page+1}`} onClick={()=>{(setPage(page + 1)); window.scroll({top: 0});}}> <button className='page-link'>Next</button></Link>}
                </li>
            </ul>
            </nav>
          </div>
        )
      }
}

export default Repos;