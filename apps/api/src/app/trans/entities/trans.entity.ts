import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
@Entity('trans', {orderBy: { CreateAt: 'DESC' }})
export class TransEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Code: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    QuantityIn: number;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    QuantityOut: number;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    CompanyAccount1: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    CompanyAccount2: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    CustomAccount1: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    CustomAccount2: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Email: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Content: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    Fee: number;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Note: string;
    @Column({ default: 1 })
    Type: number;
    @Column({ default: 1 })
    Ordering: number;
    @Column({ default: 0 })
    Status: number;
    @CreateDateColumn()
    CreateAt: Date;
    @Column({ nullable: true })
    idCreate: string;
}


