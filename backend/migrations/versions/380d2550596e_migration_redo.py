"""migration redo

Revision ID: 380d2550596e
Revises: 
Create Date: 2025-02-09 16:29:29.250085

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '380d2550596e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('answers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('highbool', sa.Boolean(), nullable=True),
    sa.Column('lowbool', sa.Boolean(), nullable=True),
    sa.Column('distbool', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('answers')
    # ### end Alembic commands ###
