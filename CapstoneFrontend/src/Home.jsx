import React from 'react';

export function Home() {
  return (
    <div>
      <header className="bg-dark text-white text-center py-5" style={{ opacity: '0.75' }}>
        <h1>Welcome!</h1>
      </header>

      <section className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card" style={{ opacity: '0.85' }}>
              <div className="card-body">
                <h2>Info Section</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eu aliquam tincidunt, velit nunc tincidunt urna, id lacinia lectus nunc id nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eu aliquam tincidunt, velit nunc tincidunt urna, id lacinia lectus nunc id nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eu aliquam tincidunt, velit nunc tincidunt urna, id lacinia lectus nunc id nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eu aliquam tincidunt, velit nunc tincidunt urna, id lacinia lectus nunc id nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eu aliquam tincidunt, velit nunc tincidunt urna, id lacinia lectus nunc id nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eu aliquam tincidunt, velit nunc tincidunt urna, id lacinia lectus nunc id nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eu aliquam tincidunt, velit nunc tincidunt urna, id lacinia lectus nunc id nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eu aliquam tincidunt, velit nunc tincidunt urna, id lacinia lectus nunc id nunc.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card" style={{ opacity: '0.85' }}>
              <div className="card-body">
                <h2>Contact Section</h2>
                <p>If you have any questions or inquiries, please feel free to contact us.</p>
                <p>Email: info@example.com</p>
                <p>Phone: 123-456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
