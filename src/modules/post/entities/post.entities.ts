import { Categories } from 'src/modules/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column('text')
  content: string;

  @Column()
  short_description: string;

  @Column({ nullable: true })
  thumbnail_url: string;

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => Categories, (category) => category.posts)
  @JoinColumn({ name: 'categoryId' })
  category: Categories;

  @Column({ nullable: true })
  category_id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
