import "./Comment.scss"
import React from "react";
import ratingIcon from '/assets/ratingIcon.png';





const Comment = ({username, service, commentDate, rating, commentText}) => {
    return (
        <div className="comment">
            <div className="commentInfo">
            <p className="commentInfoTitle">Juan Pablo Osudar</p>
            <p>Higiene del sueño</p>
            <p>25/08/2023</p>
            </div>
            <div className="commentSection">
                <p className="commentText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum animi debitis sed quisquam. Et, quaerat rem neque laudantium asperiores sunt? Laborum magni nemo eligendi, voluptatibus quis vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis fugiat quasi recusandae laborum, excepturi et magnam enim unde architecto asperiores velit incidunt esse necessitatibus natus explicabo mollitia alias id? Optio.Impedit, iure possimus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis maxime perspiciatis quae, quo culpa a voluptates quod exercitationem numquam, error eum consequatur laudantium repellat velit, minus aliquid quaerat suscipit? Tempora! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus ipsa aperiam temporibus sunt eaque impedit rerum incidunt omnis, id consectetur animi maiores porro tempore repellendus! Facere nesciunt harum error natus!</p>
                <div className="commentRating">
                    <img src={ratingIcon}/>
                    <p>{rating} / 5</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;