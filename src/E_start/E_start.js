import React, {useEffect, useState} from "react";
import "./E_start.css";
import E_product from "../components/E_product/E_product";
import {useParams} from "react-router-dom";
import Header_do from "../components/Header/Header_do";
import {Link} from "react-router-dom";

function E_start() {
    const [isMyPost, setBool] = useState(false);
    const [post, setPost] = useState([]);
    let {id} = useParams();

    useEffect(() => {
        let email = localStorage.getItem("email");
        if (email == null) {
            window.alert("로그인이 필요합니다!")
            window.location.replace("/")
        }
        let model = {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem("email")
            }
        };
        fetch(`/api/posts/` + id, model)
            .then((res) => res.json())
            .then((res) => {
                if (res.client_email == localStorage.getItem("email")){
                    setBool(true);
                }
                setPost(res)
            });

    }, []);

    function handlePostMatched() {
        let model = {
            method: "PUT",
            headers: {
                Authorization: localStorage.getItem("email"),
                "Content-Type": "application/json",
            },
        };
        fetch(`/api/posts/` + id + `/matched`, model)
            .then((res) => {
                window.alert("심부름이 수락되었습니다.");
            });
    }

    function handlePostRemove() {
        let model = {
            method: "DELETE",
            headers: {
                Authorization: localStorage.getItem("email"),
                "Content-Type": "application/json",
            },
        };
        fetch(`/api/posts/` + id, model)
            .then((res) => {
                window.alert("심부름이 삭제되었습니다.");
            });
    }

    return (
        <div>
            <Header_do/>
            <header className="form-errand">
                {
                    <E_product/>
                }
            </header>
            <div className="button_row">
                <Link to="/Home">
                    <div className="button">취소</div>
                </Link>
                {
                    isMyPost
                        ? (
                            <Link to={"/Home"}>
                                <div className="button" onClick={handlePostRemove}>삭제</div>
                            </Link>
                        )
                        : (
                            <Link to={"/E_Post/" + id}>
                                <div className="button" onClick={handlePostMatched}>수락</div>
                            </Link>
                        )
                }
            </div>
            <div className="footer_">&copy;{new Date().getFullYear()} Errand App</div>
        </div>
    );
}

export default E_start;
