import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Home() {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  useEffect(() => {
    axios.get('http://localhost:3000/article_of_the_day')
      .then(response => {
        setArticle(response.data[0].documents[0].passages[randomNumber]);
        console.log('Article:', response.data[0].documents[0].passages[randomNumber]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching article. Please try again later.</div>;
  }

  return (
    <div className='Home'>
      <section className="container mt-5">
        {article && (
          <div className="row">
            <div className="col-12">
              <div className="card" style={{ opacity: '0.85' }}>
                <div className="card-body">
                  <h2 className='title'>Article of the Day</h2>
                  <h4 className=''>{article.title || "No Author Listed"}</h4>
                  <p className='body-text'>{article.text}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-6">
            <div className="card" style={{ opacity: '0.85' }}>
              <div className="card-body">
                <h2 className='title'>Info Section</h2>
                <p className='body-text'>Our mission is to empower individuals to master the art of Olympic weightlifting through personalized learning experiences and friendly competition. We believe in fostering a community where enthusiasts of all levels can thrive, supported by expert guidance and cutting-edge technology. By providing accessible training resources, fostering a culture of continuous improvement, and facilitating friendly competition, we aim to inspire and enable every user to unlock their full potential in the pursuit of Olympic lifting excellence.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card" style={{ opacity: '0.85' }}>
              <div className="card-body">
                <h2 className='title'>Contact Us</h2>
                <p className='body-text'>If you have any questions or inquiries, please feel free to contact us.</p>
                <p>Email: info@example.com</p>
                <p>Phone: 123-456-7890</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card mt-3" style={{ opacity: '0.85' }}>
              <div className="card-body">
                <h2 className='title'>History Section</h2>
                <p className='body-text'>Our company was founded in 2020 by a group of Olympic weightlifting enthusiasts who wanted to create a platform where people could learn and grow in the sport. Since then, we have grown to become a leading provider of online weightlifting resources, with thousands of users worldwide. Our team is dedicated to helping you achieve your goals, whether you are a beginner or an experienced lifter. We are committed to providing you with the tools and support you need to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
