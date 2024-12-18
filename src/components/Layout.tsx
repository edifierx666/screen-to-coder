import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, rightPanel }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 主内容区域 */}
      <main className="w-1/2 overflow-auto p-6">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>

      {/* 右侧面板 */}
      {rightPanel && (
        <aside className="w-1/2 bg-white border-l border-gray-200 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            {rightPanel}
          </div>
        </aside>
      )}
    </div>
  );
};

export default Layout;
