import React, { ReactNode, useState } from 'react';
import './DataTable.css';

interface Column {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
}

interface DataTableProps {
  id?: string;
  columns?: Column[];
  data?: Record<string, any>[];
  title?: string;
  showPagination?: boolean;
  pageSize?: number;
  children?: ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({
  id,
  columns = [],
  data = [],
  title,
  showPagination = true,
  pageSize = 5,
  children
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const totalPages = Math.ceil(data.length / pageSize);
  
  // Сортировка данных
  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    
    const valueA = a[sortKey];
    const valueB = b[sortKey];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    return sortDirection === 'asc'
      ? (valueA > valueB ? 1 : -1)
      : (valueA < valueB ? 1 : -1);
  });
  
  // Пагинация
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  // Обработчик клика по заголовку для сортировки
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };
  
  // Обработчики пагинации
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  const goToPrevPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  return (
    <div className="data-table" id={id}>
      {children || (
        <>
          {title && <div className="table-title">{title}</div>}
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.key} 
                    style={{ width: column.width }}
                    className={column.sortable ? 'sortable' : ''}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    {column.title}
                    {sortKey === column.key && (
                      <span className={`sort-indicator ${sortDirection}`}>
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td key={column.key}>{row[column.key]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="no-data">
                    Нет данных
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {showPagination && totalPages > 1 && (
            <div className="table-footer">
              <div className="pagination">
                <button 
                  onClick={goToPrevPage} 
                  disabled={currentPage === 1}
                  className="pagination-btn prev"
                >
                  &lt;
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={goToNextPage} 
                  disabled={currentPage === totalPages}
                  className="pagination-btn next"
                >
                  &gt;
                </button>
              </div>
              
              <div className="page-info">
                Страница {currentPage} из {totalPages}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Тестовые данные для демонстрации
export const DataTableDemo: React.FC = () => {
  const columns = [
    { key: 'id', title: 'ID', width: '60px', sortable: true },
    { key: 'name', title: 'Имя', sortable: true },
    { key: 'position', title: 'Должность', sortable: true },
    { key: 'department', title: 'Отдел', sortable: true },
    { key: 'status', title: 'Статус', sortable: true }
  ];
  
  const data = [
    { id: 1, name: 'Иван Петров', position: 'Разработчик', department: 'Инженерия', status: 'Активен' },
    { id: 2, name: 'Анна Смирнова', position: 'Дизайнер', department: 'Продукт', status: 'Активен' },
    { id: 3, name: 'Сергей Иванов', position: 'Менеджер', department: 'Продажи', status: 'В отпуске' },
    { id: 4, name: 'Мария Козлова', position: 'Аналитик', department: 'Финансы', status: 'Активен' },
    { id: 5, name: 'Алексей Соколов', position: 'DevOps', department: 'Инженерия', status: 'Активен' },
    { id: 6, name: 'Елена Морозова', position: 'HR-специалист', department: 'HR', status: 'Активен' },
    { id: 7, name: 'Дмитрий Волков', position: 'Тестировщик', department: 'Инженерия', status: 'В отпуске' },
    { id: 8, name: 'Ольга Новикова', position: 'Маркетолог', department: 'Маркетинг', status: 'Активен' },
    { id: 9, name: 'Игорь Ковалев', position: 'Разработчик', department: 'Инженерия', status: 'Активен' },
    { id: 10, name: 'Наталья Лебедева', position: 'Бухгалтер', department: 'Финансы', status: 'В отпуске' }
  ];
  
  return (
    <DataTable 
      title="Список сотрудников" 
      columns={columns} 
      data={data} 
      showPagination={true}
      pageSize={5}
    />
  );
};

export default DataTable; 