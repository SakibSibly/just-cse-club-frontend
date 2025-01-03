import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import { formatDateTime } from '../../shared/utils/dateTimeConverter';
import './Blogs.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Fetch blogs from the backend
        const fetchBlogs = async () => {
            try {
                const response = await api.get('/api/blogs/');
                const data = await response.data;
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    // If id exists, render a detailed view
    if (id) {
        const blog = blogs.find(blog => blog.id === parseInt(id));
        return (
            <div className="blog-detail">
                <h2>{blog?.title}</h2>
                <p><strong>Author:</strong> {blog?.author}</p>
                <p><strong>Likes:</strong> {blog?.likes}</p>
                <p><strong>Dislikes:</strong> {blog?.dislikes}</p>
                <p><strong>Created At:</strong> {formatDateTime(blog?.created_at)}</p>
                <p><strong>Last Updated:</strong> {formatDateTime(blog?.updated_at)}</p>
                <p><strong>Description:</strong></p>
                <p>{blog?.description}</p>
                <Link to="/blogs">Back to Blogs</Link>
            </div>
        );
    }

    // Render card view
    return (
        <div className="blogs">
            <h1>Blogs</h1>
            <div className="blog-cards">
                {blogs.map(blog => (
                    <div className="blog-card" key={blog.id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.description.substring(0, 100)}...</p>
                        <p><strong>Author:</strong> {blog.author}</p>
                        <p><strong>Likes:</strong> {blog.likes}</p>
                        <p><strong>Dislikes:</strong> {blog.dislikes}</p>
                        <p><strong>Created At:</strong> {formatDateTime(blog.created_at)}</p>
                        <Link to={`/blogs/${blog.id}`}>Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
