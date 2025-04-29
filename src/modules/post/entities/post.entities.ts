import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  content: string;

  @Column()
  thumbnail_url: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
