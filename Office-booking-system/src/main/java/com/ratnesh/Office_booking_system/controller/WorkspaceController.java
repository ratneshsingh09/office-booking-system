package com.ratnesh.Office_booking_system.controller;

import com.ratnesh.Office_booking_system.entity.Workspace;
import com.ratnesh.Office_booking_system.repository.WorkspaceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
@CrossOrigin
public class WorkspaceController {

    private final WorkspaceRepository workspaceRepository;

    public WorkspaceController(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    @GetMapping
    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll();
    }

    @PostMapping
    public Workspace addWorkspace(@RequestBody Workspace workspace) {
        return workspaceRepository.save(workspace);
    }
}