import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import "../App.css";

const Commits = () => {
    let {repoName} = useParams();
    const {pagenum} = useParams();
    const [commitData, setCommitData] = useState(undefined);
    const [page, setPage] = useState(parseInt(pagenum));
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage(parseInt(pagenum));
    setError(false);
    console.log(repoName);
    async function fetchData() {
      try {
        const { data } = await axios.get(`https://api.github.com/repos/Netflix/${repoName}/commits?page=${page}`, {
            headers: {
                'Authorization': 'BEARER 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'
            }
          });
        setCommitData(data);
        setLoading(false);
        console.log(commitData);
        if(data.length < 1){
            throw"error";
        }
      } catch (e) {
        setError(true);
        console.log(e);
      }
      try{
        const { data } = await axios.get(`https://api.github.com/repos/Netflix/${repoName}/commits?page=${page + 1}`, {
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
  }, [page, pagenum, repoName]);
  

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <h2>404: NO DATA</h2>
      </div>
    );
  }

  if(commitData){
    return (
        <div>
        <br/>
        <br/>
        <nav aria-label="...">
        <ul className="pagination justify-content-center">
            <li className="page-item">
            {page === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/commits/${repoName}/${page-1}`} onClick={()=>(setPage(page - 1))} > <button className='page-link'>Prev</button></Link>}
            </li>
            <li className="page-item active" aria-current="page">
            <span className="page-link">{page}</span>
            </li>
            <li className="page-item">
            {disable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/commits/${repoName}/${page+1}`} onClick={()=>(setPage(page + 1))}> <button className='page-link'>Next</button></Link>}
            </li>
        </ul>
        </nav>
        <br/>
        <br/>
        <div className="row row-cols-1 row-cols-md-2 g-4">
        {commitData.map((commit) => {
          return (
            <div className='col-sm-6' key={commit.id}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{commit.commit ? commit.commit.message : 'No Message Available'}</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{!commit.committer ? "Committer Username: N/A" : `Committer Username: ${commit.committer.login}`}</li>
                            <li className="list-group-item">Hash: {commit.sha ? commit.sha : "No Hash"}</li>
                            <li className="list-group-item">Date Committed: {commit.commit.committer.date ? commit.commit.committer.date : "No commit date"}</li>
                        </ul>
                    </div>
                </div>
            </div>
            )
        })}
        </div>
        <nav aria-label="...">
        <ul className="pagination justify-content-center">
            <li className="page-item">
            {page === 1 ? <button className="page-link" disabled={true}>Prev</button> : <Link to={`/commits/${repoName}/${page-1}`} onClick={()=>{(setPage(page - 1)); window.scroll({top: 0});}} > <button className='page-link'>Prev</button></Link>}
            </li>
            <li className="page-item active" aria-current="page">
            <span className="page-link">{page}</span>
            </li>
            <li className="page-item">
            {disable === true ? <button className="page-link" disabled={true}>Next</button> : <Link to={`/commits/${repoName}/${page+1}`} onClick={()=>{(setPage(page + 1)); window.scroll({top: 0});}}> <button className='page-link'>Next</button></Link>}
            </li>
        </ul>
        </nav>
      </div>
    )
  }
};
export default Commits;