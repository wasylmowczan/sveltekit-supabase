import { PRIVATE_LOOPS_API_KEY } from '$env/static/private';
import { LoopsClient } from 'loops';

const loops = new LoopsClient(PRIVATE_LOOPS_API_KEY);

export default loops;
