import React, { useState, useCallback } from 'react';
import { Website } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import WebsiteCard from './components/WebsiteCard';
import CreateSiteModal from './components/CreateSiteModal';
import Footer from './components/Footer';
import { initialWebsites } from './constants';
import './index.css'

const App: React.FC = () => {
  const [websites, setWebsites] = useLocalStorage<Website[]>('websites', initialWebsites);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('전체');

  const handleCreateSite = useCallback((newSiteData: Omit<Website, 'id' | 'thumbnailUrl'>) => {
    const newSite: Website = {
      ...newSiteData,
      id: `site-${Date.now()}`,
      thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/500/300`,
    };
    setWebsites(prevSites => [newSite, ...prevSites]);
    setIsModalOpen(false);
  }, [setWebsites]);

  const handleDeleteSite = useCallback((siteId: string) => {
    setWebsites(prevSites => prevSites.filter(site => site.id !== siteId));
  }, [setWebsites]);

  const filteredWebsites = websites.filter(
    site => activeCategory === '전체' || site.category === activeCategory
  );

  return (
    <div className="app-container">
      <Header
        onOpenCreateModal={() => setIsModalOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <main className="app-main">
        {filteredWebsites.length > 0 ? (
          <div className="site-grid">
            {filteredWebsites.map(site => (
              <WebsiteCard key={site.id} website={site} onDelete={handleDeleteSite} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2 className="empty-title">
              {activeCategory === "전체"
                ? "아직 웹사이트가 없습니다!"
                : `'${activeCategory}' 카테고리에 웹사이트가 없습니다.`}
            </h2>
            <p className="empty-text">"새 사이트 만들기"를 클릭하여 시작하세요.</p>
          </div>
        )}
      </main>

      <Footer />

      <CreateSiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateSite}
      />
    </div>
  );
}
export default App;