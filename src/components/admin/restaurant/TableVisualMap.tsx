
import React from 'react';
import { motion } from 'framer-motion';
import type { RestaurantTable } from '@/types/restaurant';

interface TableVisualMapProps {
  tables: RestaurantTable[];
  onSelectTable: (table: RestaurantTable) => void;
}

const TableVisualMap: React.FC<TableVisualMapProps> = ({
  tables,
  onSelectTable
}) => {
  // Group tables by location
  const tablesByLocation: Record<string, RestaurantTable[]> = tables.reduce((acc, table) => {
    const location = table.location || 'other';
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(table);
    return acc;
  }, {} as Record<string, RestaurantTable[]>);

  // Get locations in order of priority
  const locations = [
    'indoor', 'outdoor', 'terrace', 'window', 'bar', 'private', 'other'
  ].filter(loc => tablesByLocation[loc]);

  if (tables.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/20 rounded-lg">
        <p className="text-muted-foreground">Nenhuma mesa cadastrada para visualizar</p>
      </div>
    );
  }

  const getLocationTitle = (location: string): string => {
    switch (location) {
      case 'indoor': return 'Área Interna';
      case 'outdoor': return 'Área Externa';
      case 'terrace': return 'Terraço';
      case 'window': return 'Mesas de Janela';
      case 'bar': return 'Bar';
      case 'private': return 'Área Privativa';
      case 'other': return 'Outras Áreas';
      default: return location;
    }
  };

  return (
    <div className="space-y-8">
      {locations.map(location => (
        <div key={location} className="space-y-2">
          <h3 className="font-medium text-lg">{getLocationTitle(location)}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-muted/20 rounded-lg">
            {tablesByLocation[location].map(table => (
              <TableVisualItem 
                key={table.id} 
                table={table}
                onClick={() => onSelectTable(table)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface TableVisualItemProps {
  table: RestaurantTable;
  onClick: () => void;
}

const TableVisualItem: React.FC<TableVisualItemProps> = ({ table, onClick }) => {
  const getTableSize = (capacity: number): string => {
    if (capacity <= 2) return 'w-16 h-16';
    if (capacity <= 4) return 'w-20 h-20';
    if (capacity <= 6) return 'w-24 h-24';
    return 'w-28 h-28';
  };

  const getTableShape = (capacity: number): string => {
    if (capacity <= 2) return 'rounded-full'; // Circular for 2 people
    return 'rounded-lg'; // Square for larger tables
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center cursor-pointer
        ${table.is_active ? 'bg-white' : 'bg-gray-200'}
        border-2 ${table.is_active ? 'border-green-600' : 'border-gray-400'}
        ${getTableShape(table.capacity)}
        ${getTableSize(table.capacity)}
        transition-colors shadow-sm
      `}
    >
      <span className="font-bold text-lg">{table.table_number}</span>
      <span className="text-xs">{table.capacity} lugares</span>
    </motion.div>
  );
};

export default TableVisualMap;
