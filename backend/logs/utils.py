def compute_log_grid(cycle_used):
    grid=[]
    hours=min(max(cycle_used,0),24)
    for i in range(24):
        grid.append([0,0,1,0] if i<hours else [1,0,0,0])
    return grid
