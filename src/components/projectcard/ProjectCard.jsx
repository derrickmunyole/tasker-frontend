
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const ProjectCardContent = ({project}) => (
  <React.Fragment>
    <CardContent>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        Project #{project.id}
      </Typography>
      <Typography variant="h5" component="div">
        {project.name}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>In Progress</Typography>
      <Typography variant="body2">
        {project.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Details</Button>
    </CardActions>
  </React.Fragment>
);

export default function ProjectCard({project}) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <ProjectCardContent project={project} />
      </Card>
    </Box>
  );
}
