import { movie } from "./JSON"

const MapMovies=()=>{
    return(
        <div style={{display:'flex',width:'100%',height:'auto',flexWrap:'wrap', gap:'20px', justifyContent:'center'}}>
            {movie.map((data)=>{
                console.log('res',data)
                return(
                    <div style={{width:'200px',height:'auto',padding:'10px',border:'1px solid white'}}>
                <img src={data.Images[0]} alt="movie-image" style={{width:'100%',height:'150px'}} />
                <h2>{data.Title} <span style={{fontSize:'10px'}}>({data.Year})</span> </h2>
                <p>{data.Released} &nbsp;&nbsp; {data.Runtime}</p>

            </div>
                )

            })}
        </div>
    )
}
export default MapMovies;