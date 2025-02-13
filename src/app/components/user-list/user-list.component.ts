import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Users } from '../../interfaces/users';
import { UsersService } from '../../services/users.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { delay } from 'rxjs';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: Users[] = [];
  filteredUsers: Users[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(
    private userService: UsersService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers()
    .subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.isLoading = false;
        this.snackBar.open("Users Fetched successfully", "close", {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      },
      error: (error) => {
        this.snackBar.open('Error fetching users:', "close", {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
        this.isLoading = false;
      }
    });
  }

  filterUsers() {
    this.isLoading = true;
    
    if (this.searchTerm) {
      setTimeout(() => {
        this.filteredUsers = this.users.filter(user =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        
        if (this.filteredUsers.length > 0) {
          this.snackBar.open(`Found ${this.filteredUsers.length} users`, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        } else {
          this.snackBar.open('No users found', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
        this.isLoading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.filteredUsers = this.users;
        this.isLoading = false;
      }, 1000);
    }
  }
  
}