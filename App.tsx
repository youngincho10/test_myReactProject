import React, { useState } from 'react';
import Header from './components/Header';
import WebsiteCard from './components/WebsiteCard';
import Footer from './components/Footer';
import { initialWebsites } from './constants';
import './index.css';

const ALL_CATEGORY = '\uc804\uccb4';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  const filteredWebsites =
    activeCategory === ALL_CATEGORY
      ? initialWebsites
      : initialWebsites.filter((site) => site.category === activeCategory);

  return (
    <div className="app-container">
      <Header activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      <main className="app-main">
        {filteredWebsites.length > 0 ? (
          <div className="site-grid">
            {filteredWebsites.map((site) => (
              <WebsiteCard key={site.id} website={site} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2 className="empty-title">
              {activeCategory === ALL_CATEGORY
                ? '\uc900\ube44\ub41c \uc0ac\uc774\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.'
                : `"${activeCategory}" \uce74\ud14c\uace0\ub9ac\uc5d0 \ub4f1\ub85d\ub41c \uc0ac\uc774\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.`}
            </h2>
            <p className="empty-text">
              {'\uc7a0\uc2dc\ub9cc \uae30\ub2e4\ub824 \uc8fc\uc138\uc694. \uace0\ub4dc \uc0c8\ub85c\uc6b4 AI \uc2a4\ud29c\ub514\uc624 \uc571\uc774 \ucd94\uac00\ub420 \uc608\uc815\uc785\ub2c8\ub2e4.'}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
