package com.ratnesh.Office_booking_system.entity;

import jakarta.persistence.*;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long workspaceId;
    private String userName;
    private String date;
    private String startTime;
    private String endTime;

    public Booking(){}

    public Long getId(){ return id; }

    public Long getWorkspaceId(){ return workspaceId; }

    public String getUserName(){ return userName; }

    public String getDate(){ return date; }

    public String getStartTime(){ return startTime; }

    public String getEndTime(){ return endTime; }

    public void setWorkspaceId(Long workspaceId){ this.workspaceId = workspaceId; }

    public void setUserName(String userName){ this.userName = userName; }

    public void setDate(String date){ this.date = date; }

    public void setStartTime(String startTime){ this.startTime = startTime; }

    public void setEndTime(String endTime){ this.endTime = endTime; }
}