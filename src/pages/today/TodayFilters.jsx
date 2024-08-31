import { Chip, Stack } from '@mui/material';

export default function TodayFilters({ filters, toggleFilter }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip 
        label="All Tasks" 
        onClick={() => toggleFilter('all')}
        color={filters.includes('all') ? 'primary' : 'default'}
      />
      <Chip 
        label="Unassigned" 
        onClick={() => toggleFilter('unassigned')}
        color={filters.includes('unassigned') ? 'primary' : 'default'}
      />
      <Chip 
        label="No Project" 
        onClick={() => toggleFilter('no_project')}
        color={filters.includes('no_project') ? 'primary' : 'default'}
      />
      <Chip 
        label="High Priority" 
        onClick={() => toggleFilter('priority')}
        color={filters.includes('priority') ? 'primary' : 'default'}
      />
    </Stack>
  );
}
