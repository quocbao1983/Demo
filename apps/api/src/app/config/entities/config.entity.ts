import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
@Entity('config', {orderBy: { CreateAt: 'DESC' }})
export class ConfigEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    Sellprice: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    Buyprice: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    SellFee: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    BuyFee: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    Mintrade: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    Maxtrade: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    Totaltrade: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Note: string;
    @Column({ default: 0 })
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